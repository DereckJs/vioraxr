import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Badge, IconButton, Menu, MenuItem, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import { setNotifications, addNotification, markNotificationRead } from '../actions';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// Consider moving Echo instantiation to a global setup file like Root.js
const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    wsHost: window.location.hostname,
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 360,
        maxHeight: 400,
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottom: '1px solid #eee',
        whiteSpace: 'normal',
    },
    unread: {
        backgroundColor: '#e3f2fd',
        fontWeight: 'bold',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        borderBottom: '1px solid #ddd',
    },
    title: {
        fontWeight: 'bold',
    },
    empty: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#777',
    }
}));

const NotificationBell = ({ notifications, unreadCount, setNotifications, addNotification, markNotificationRead, userId }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // Fetch initial notifications
        // Assuming API base url is configured in axios
        axios.get('http://localhost:8000/api/notifications', {
            withCredentials: true // For sanctum auth
        }).then(response => {
            const data = response.data.data;
            const unread = data.filter(n => !n.read_at).length;
            setNotifications(data, unread);
        }).catch(err => console.error("Error fetching notifications", err));

        if (userId) {
            echo.private(`App.Models.User.${userId}`)
                .notification((notification) => {
                    addNotification(notification);
                });
        }

        return () => {
            if (userId) echo.leave(`App.Models.User.${userId}`);
        };
    }, [userId, setNotifications, addNotification]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (id, action_url) => {
        axios.patch(`http://localhost:8000/api/notifications/${id}/read`, {}, { withCredentials: true })
            .then(() => {
                markNotificationRead(id);
                if (action_url) {
                    window.location.href = action_url;
                }
            });
    };

    const markAllRead = () => {
        axios.post('http://localhost:8000/api/notifications/mark-all-read', {}, { withCredentials: true })
            .then(() => {
                const updated = notifications.map(n => ({ ...n, read_at: new Date().toISOString() }));
                setNotifications(updated, 0);
            });
    };

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                classes={{ paper: classes.paper }}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div className={classes.header}>
                    <Typography className={classes.title}>Notificaciones</Typography>
                    {unreadCount > 0 && (
                        <Button size="small" color="primary" onClick={markAllRead}>
                            Marcar todo como leído
                        </Button>
                    )}
                </div>
                {notifications.length === 0 ? (
                    <div className={classes.empty}>No tienes notificaciones</div>
                ) : (
                    notifications.map((notif) => (
                        <MenuItem 
                            key={notif.id} 
                            onClick={() => handleNotificationClick(notif.id, notif.data?.action_url)}
                            className={`${classes.menuItem} ${!notif.read_at ? classes.unread : ''}`}
                        >
                            <Typography variant="subtitle2">{notif.data?.title || 'Notificación'}</Typography>
                            <Typography variant="body2" color="textSecondary">{notif.data?.body}</Typography>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        notifications: state.notifications || [],
        unreadCount: state.unreadCount || 0,
        userId: (state.user && state.user.id) || null // Adjust this based on how user is stored
    };
};

export default connect(mapStateToProps, { setNotifications, addNotification, markNotificationRead })(NotificationBell);
