
const malina = require('malinajs');

export default function malinaRollup(options = {}) {
    return {
        name: 'malina',
        transform(code, id) {
            if(!id.endsWith('.html')) return null;
            let result = 'export default ' + malina.compile(code, {name: 'widget'});
            return {code: result};
        }
    };
}