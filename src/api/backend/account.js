import { sendDeleteRequest, sendGetRequest, sendPutRequest, sendPostFileRequest } from ".";

async function updateProfile (data) {
    const ENDPOINT_PATH = `/account/profile`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;
}

async function updatePassword (data) {
    const ENDPOINT_PATH = `/account/password`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;
}

async function deleteAccount (data) {
    const ENDPOINT_PATH = `/account`;

    const result = await sendDeleteRequest(ENDPOINT_PATH, data);

    return result;
}

async function updateProducerProfile (data) {
    const ENDPOINT_PATH = `/account/producer`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;
}

async function updateProducerAddress () {
    const ENDPOINT_PATH = `/account/address`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;
}

async function updateProducerProfilePicture (data) {
    const ENDPOINT_PATH = `/account/producer/profile-picture`;

    // do this one later, because the upload has a different content-type
    const result = await sendPostFileRequest(ENDPOINT_PATH, data);

    return result;
}

async function getCurrentProducer(query) {
    const ENDPOINT_PATH = `/account/producer`;
  
    const result = await sendGetRequest(ENDPOINT_PATH, { ...query });
  
    return result;
  }

export {
    updateProfile,
    updatePassword,
    deleteAccount,
    updateProducerProfile,
    updateProducerAddress,
    updateProducerProfilePicture,
    getCurrentProducer
};

export default {
    updateProfile,
    updatePassword,
    deleteAccount,
    updateProducerProfile,
    updateProducerAddress,
    updateProducerProfilePicture,
    getCurrentProducer
};
