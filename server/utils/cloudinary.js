const FormData = require('form-data');
const axios = require('axios');

async function uploadImage(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'chat app');
    data.append('cloud_name', 'dqpkklg6z');
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.cloudinary.com/v1_1/dqpkklg6z/image/upload',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.url;
    }
    catch (error) {
        console.log('error in uploading profile pic');
        console.log(error);
    }
}

module.exports = {
    uploadImage
}