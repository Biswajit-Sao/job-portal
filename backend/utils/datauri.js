import DataUriParser from 'datauri/parser.js'
import path from 'path'

const getDataUri=(file)=>{
    const paeser=new DataUriParser();
    const extName=path.extname(file.originalname).toString();
    return paeser.format(extName,file.buffer)
}
export default getDataUri;