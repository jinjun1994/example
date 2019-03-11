import {cloneDeep} from 'lodash-es';
const sync = () =>{
    console.log('sync')
}
const isArray1 = (args) =>{
    console.log(cloneDeep(args))
}
export {
    sync,
    isArray1
}
