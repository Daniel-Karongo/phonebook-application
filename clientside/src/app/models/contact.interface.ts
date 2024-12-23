export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    physical_address: string;
    contact_image: string;
    is_deleted: boolean; // For soft delete
    favorite: number
}