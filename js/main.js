import {renderPhotos} from './photos.js';
import {getData} from './api.js';
import {renderFileUpload} from './photo-upload.js';

getData(renderPhotos);
renderFileUpload();
