export const saveIdsToStorage = (name: string, date: string | string[]): void => {
    let arrayId: string[] = [];

    if (!window || !window.localStorage) {
        return;
    }

    try {
        const storedData: string | null = window.localStorage.getItem(name);
        arrayId = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('LocalStorage error:', error);
        return;
    }

    if (Array.isArray(date)) {
        date.forEach((el: string): void => {
            if (!arrayId.includes(el)) {
                arrayId.push(el);
            }
        });
    } else if (!arrayId.includes(date)) {
        arrayId.push(date);
    }
    window.localStorage.setItem(name, JSON.stringify(arrayId));
};

export const saveToStorage = (name: string, value: string): void => {
    if (!window || !window.localStorage) {
        return;
    }
    window.localStorage.setItem(name, JSON.stringify(value));
};

export const getFromStorage = <T>(name: string): T | null => {
    if (!window || !window.localStorage) {
        return null;
    }
    try {
        const item: string | null = window.localStorage.getItem(name);
        return item ? JSON.parse(item) as T : null;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const deleteIdsFromStorage = (name: string, date: string): void => {
    if (!window || !window.localStorage) {
        return;
    }
    const arrayId = JSON.parse(window.localStorage.getItem(name) || '[]');
    const filterArray = arrayId.filter((item: string): boolean => item !== date);
    window.localStorage.setItem(name, JSON.stringify(filterArray));
};