const CONTACT_TYPE_WHATSAPP = 'whatsapp';
const CONTACT_TYPE_PHONE = 'phone';
const CONTACT_TYPE_EMAIL = 'email';
const CONTACT_TYPE_INSTAGRAM = 'instagram';

function getContactHref (contactType, value) {
    switch (contactType) {
        case CONTACT_TYPE_WHATSAPP:
            return `https://wa.me/${value.trim().split(' ').join('')}`;
            break;
        case CONTACT_TYPE_PHONE:
            return `tel:${value.trim().replace(' ', '')}`;
            break;
        case CONTACT_TYPE_EMAIL:
            return `mailto:${value.trim()}`;
            break;
        case CONTACT_TYPE_INSTAGRAM:
            if (value.includes('http://') || value.includes('https://')) {
                return value;
            }
            return `https://instagram.com/${value.trim()}`;
            break;
    
        default:
            break;
    }
}

export {
    CONTACT_TYPE_WHATSAPP,
    CONTACT_TYPE_PHONE,
    CONTACT_TYPE_EMAIL,
    CONTACT_TYPE_INSTAGRAM,
    getContactHref
 };
