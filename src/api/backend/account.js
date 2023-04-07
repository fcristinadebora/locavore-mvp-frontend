import { sendDeleteRequest, sendGetRequest, sendPutRequest, sendMultiPartFormRequest, sendPostRequest } from ".";

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

async function updateProducerAddress (data) {
    const ENDPOINT_PATH = `/account/producer/address`;

    const result = await sendPutRequest(ENDPOINT_PATH, data);

    return result;
}

async function replaceProducerContacts (data) {
    const ENDPOINT_PATH = `/account/producer/contacts/replace`;

    const result = await sendPostRequest(ENDPOINT_PATH, data);

    return result;
}

async function updateProducerProfilePicture (data) {
    const ENDPOINT_PATH = `/account/producer/profile-picture`;

    // do this one later, because the upload has a different content-type
    const result = await sendMultiPartFormRequest(ENDPOINT_PATH, data);

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
    getCurrentProducer,
    replaceProducerContacts
};

export default {
    updateProfile,
    updatePassword,
    deleteAccount,
    updateProducerProfile,
    updateProducerAddress,
    updateProducerProfilePicture,
    getCurrentProducer,
    replaceProducerContacts
};
