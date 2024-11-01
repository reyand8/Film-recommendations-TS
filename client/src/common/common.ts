import theme from '../assets/theme';

export const getVoteCicle = (vote: number): string | undefined => {
    if (vote <= 100) {
        return vote.toFixed(1);
    }
    return undefined;
};

export const changeColor = (vote: number): string => {
    if (vote >= 66.67) {
        return theme.palette.success.main;
    } else if (vote >= 33.34) {
        return theme.palette.warning.light;
    }else {
        return theme.palette.error.light;
    }
};