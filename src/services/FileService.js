import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';

const FileService = {
  pickFile: async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );

      return res;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  },
  scanDocument: callback => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 720,
        maxWidth: 1080,
      },
      response => {
        callback(response);
      },
    );
  },
};

export default FileService;
