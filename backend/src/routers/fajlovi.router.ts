import express, { Request } from 'express'
import { FajlController } from '../controllers/fajl.controller';
import { KorisnikController } from '../controllers/korisnik.controller';


const fajlRouter = express.Router();
interface extendedRequest extends Request{
    files:any;
}
  const  multipart  =  require('connect-multiparty');
var EXT_RE = /(\.[_\-a-zA-Z0-9]{0,16}).*/g;
const  multipartMiddleware  =  multipart({ uploadDir:  './public', 
filename: function(filename, callback){
  var name = filename.replace(EXT_RE, "");
  callback(name+'-YEAH.png');
}
});

fajlRouter.route('/otpremanje').post(multipartMiddleware, (req : extendedRequest, res) => {
    try{
    const file = req.files.uploads[0];
    let fileName = file.path;
    fileName = fileName.replace(/^.*[\\\/]/, '')
  
    res.json({
      message: 'File uploaded successfully.',
      fileName: fileName,
    });
  }catch{
    console.log("upload err")
  }
});


export default fajlRouter;