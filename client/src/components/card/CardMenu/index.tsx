import React, { MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import {ICardMenuProps} from '../../../types/props.interface';


const CardMenu: React.FC<ICardMenuProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    background: 'rgba(255, 255, 255, .3)',
                }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                aria-haspopup="true"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                {children}
            </Menu>
        </>
    );
};

export default CardMenu;