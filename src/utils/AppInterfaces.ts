export interface CarObjectInterface {
    id: string;
    make: string;
    mileage: string;
    price: string;
    yom: string;
}

export interface PopularCarInterface {
    id: any;
    make: string | undefined;
    mileage: string | number,
    yom: string
    price: string;
    imageUrl: string | undefined;
    title: string

}

export interface MessagesData {
    from: string;
    lastMessage: string,
    messageTime: string | typeof Date;
    imageUrl: string;

}

export interface CommunicationDateInterface {
    sender: string;
    message: string;
    messageTime: string | typeof Date;
}

export interface SectionDateInterface {
    title: string;
    data: [...args: string[]]
}
