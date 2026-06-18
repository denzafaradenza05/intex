import { TABLE_DATA } from '../data/tableData.js';

// Promise
export const fetchTableData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            if (TABLE_DATA.length > 0) {
                resolve([...TABLE_DATA]);
            } else {
                reject(new Error('Данные не найдены'));
            }
        }, 500);
    });
};
