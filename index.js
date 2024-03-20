
const csv = require('csv-parser');
const fs = require('fs');
const {ElementorFormKeys, TeamsFormKeys, FieldsToDelete} = require("./KeysObj.js");
const {AllKeys, BooleanFields} = require("./KeysObj");
const result = [];
const elementorFields = [];
const teamsFields = [];
const inputPath1 = "tablesToConvert/interessados.csv" || null; // elementor
const inputPath2 = "" || null; // teams



const readCSV = new Promise((resolve, reject) => {
    fs.createReadStream(inputPath1, {encoding: 'utf8'})
        .pipe(csv())
        .on('data',  (data) => {

            const newData = {...data, nome: data['﻿nome'], id_curso: parseInt(data.id_curso)}
            delete newData['﻿nome']
            result.push(newData)
        })
        .on('end', () => {
            console.log('success');
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        });


});


readCSV.then(() => {
    console.log(formatDateForPostgresInteressados(setBooleanFields(result, BooleanFields)))

}).catch((error) => {
    console.error('Error reading CSV:', error);
});

//////////////////////////////////////////////////////////////


/*const readCSV = new Promise((resolve, reject) => {
    fs.createReadStream(inputPath1, {encoding: 'binary'})
        .pipe(csv())
        .on('data',  (data) => {

            const formattedFields = filteredFields(renameKeysElementorForm(ElementorFormKeys, data))
            elementorFields.push(formattedFields);
        })
        .on('end', () => {
            console.log('success');
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        });

    fs.createReadStream(inputPath2, {encoding: 'binary'})
        .pipe(csv())
        .on('data', (data) => {
            const formattedFields = filteredFields(renameKeysTeamsForm(TeamsFormKeys, data))
            teamsFields.push(formattedFields);
        })
        .on('end', () => {
            console.log('success');
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        });
});

//////////////////////////////////////////////////////////////
readCSV.then(() => {
    const elementorFieldsFiltered = removeDuplicatesByEmail(elementorFields)

    const mergedLists = fillMissingKeys(mergedList(elementorFieldsFiltered, teamsFields), AllKeys, null)

    const fixedBooleanAndDate = formatDateForPostgres(setBooleanFields(mergedLists, BooleanFields))
    console.log(fixedBooleanAndDate)

}).catch((error) => {
    console.error('Error reading CSV:', error);
});
//////////////////////////////////////////////////////////////////*/
const renameKeysElementorForm = (keysMap, obj) =>
     Object.keys(obj).reduce((acc, key) => ({
        ...acc,
        ...{[keysMap[key] || key]: obj[key]}
    }), {});

const renameKeysTeamsForm = (keysMap, obj) =>
    Object.keys(obj).reduce((acc, key) => ({
        ...acc,
        ...{[keysMap[key] || key]: obj[key]}
    }), {});


const filteredFields = fields => {
    const result = Object.entries(fields).filter(([key, value]) => !FieldsToDelete.includes(key))
    return Object.fromEntries(result)
}


const mergeWithoutDuplicates = (obj1, obj2) => {
    const merged = { ...obj1 };
    for (const key in obj2) {
        if (!merged.hasOwnProperty(key)) {
            merged[key] = obj2[key];
        }
    }
    return merged;
}

const setBooleanFields = (list, booleanFields) => {
    list.forEach(obj => {
        booleanFields.forEach(field => {
            if (obj[field] === 'on' || obj[field] === 'Sim') {
                obj[field] = true;
            } else if (obj[field] === '' || obj[field] === 'Não') {
                obj[field] = false;
            }
        });
    });
    return list;
};

function formatDateForPostgres(array) {
    return array.map(obj => {
        const [datePartInscricao, timePartInscricao] = obj.data_inscricao.split(' ');
        const formattedDateInscricao = datePartInscricao.split('/').reverse().join('-');

        const [datePartNascimento, timePartNascimento] = obj.data_nascimento.split(' ');
        const formattedDateNascimento = datePartNascimento.split('/').reverse().join('-');

        return { ...obj, data_inscricao: formattedDateInscricao, data_nascimento: formattedDateNascimento };
    });
}

function formatDateForPostgresInteressados(array) {
    return array.map(obj => {
        const [datePartInteressados, timePartInteressados] = obj.data_insteresse.split(' ');
        const formattedDateInteressados = datePartInteressados.split('/').reverse().join('-');

        return { ...obj, data_insteresse: formattedDateInteressados };
    });
}
const mergedList = (list1, list2) => list1.map(obj1 => {
    const matchingObj = list2.find(obj2 => obj2.email === obj1.email);
    if (matchingObj) {
        return mergeWithoutDuplicates(obj1, matchingObj);
    }
    return obj1;
});


const fillMissingKeys = (objects, keys, defaultValue) => {
    return objects.map(obj => {
        const newObj = { ...obj }; // Create a copy of the object to avoid mutating the original
        keys.forEach(key => {
            if (!(key in newObj)) {
                newObj[key] = defaultValue;
            }
        });
        return newObj;
    });
}

const removeDuplicatesByEmail = (array) => {
    const seenEmails = {};
    return array.filter(item => {
        if (seenEmails[item.email]) {
            return false; // If the email has been seen before, filter it out
        } else {
            seenEmails[item.email] = true; // Mark the email as seen
            return true; // Keep the item
        }
    });
};

