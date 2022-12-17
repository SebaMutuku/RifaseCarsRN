import {carData, CommunicationDataProps, MessageTemplate, ReviewData, SectionDateInterface} from "./AppInterfaces";

export const PopularCarData: carData[] = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    make: "Honda",
    model: "Fit",
    mileage: "20000",
    yom: "1999",
    price: "900,000",
    imageUrl: "../../../assets/images/mainCarImage.jpg",

}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    make: "Audi",
    model: "A3",
    mileage: "21000",
    yom: "2000",
    price: "951,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg'
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    make: "Suzuki",
    mileage: "22000",
    yom: "2001",
    price: "550,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "Swift",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    make: "BMW",
    mileage: "23000",
    yom: "2002",
    price: "2,100,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "i320",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    make: "Toyota",
    mileage: "24000",
    yom: "2003",
    price: "2,300,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "Mark X",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    make: "Lexus",
    mileage: "25000",
    yom: "2004",
    price: "2,800,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "C5",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d76",
    make: "Mazda",
    mileage: "26000",
    yom: "2005",
    price: "760,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "C6",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    make: "Mercedes",
    mileage: "27000",
    yom: "2006",
    price: "2,700,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "E5",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d78",
    make: "RangeRover",
    mileage: "28000",
    yom: "2007",
    price: "4,500,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "L2",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d79",
    make: "Nissan",
    mileage: "20000",
    yom: "2010",
    price: "940,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "Murano",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d80",
    make: "Volvo",
    mileage: "29000",
    yom: "2008",
    price: "1,400,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "V1",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d81",
    make: "Subaru ",
    mileage: "30000",
    yom: "2009",
    price: "1,410,000",
    imageUrl: '../../../assets/images/mainCarImage.jpg',
    model: "Impreza",
}];
export const carBrands: any [] = ["audi", "bmw", "honda", "lexus", "mazda", "mercedes", "nissan", "rangerover", "subaru", "suzuki", "toyota", "volvo"];
export const usersD = [{
    name: "Seba", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Vice Chairman'
}, {
    name: "Sebastian", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Sebastian'
}, {
    name: "Testing", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Testing'
}, {
    name: "Ona", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Ona'
}, {
    name: "Mac", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Mac'
}, {
    name: "Users", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Users'
}, {
    name: "Testers 1", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Testers 1'
}, {
    name: "Laughter", avatar_url: 'https://randomuser.me/api/portraits/men/36.jpg', subtitle: 'Laughter'
}]
export const messagesData: MessageTemplate[] = [{
    from: "Seba",
    lastMessage: "Hey, how are you?",
    messageTime: "2022-09-01",
    imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Test",
    lastMessage: "Testing comple",
    messageTime: "2022-09-01",
    imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Nairobi",
    lastMessage: "Dear,Nairobi welcome back",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Ona Ke",
    lastMessage: "Congratulations on your promotion",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Facebook",
    lastMessage: "Invalid username and or password",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "User tester",
    lastMessage: "App successfully installed",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Mamilioni",
    lastMessage: "Yeey,You are a millionaire",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Sunday",
    lastMessage: "Happy Sunday bro",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "Jeremy",
    lastMessage: "Where are you at?",
    messageTime: "2022-09-01", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}, {
    from: "John Doe",
    lastMessage: "This is a test account",
    messageTime: "2022-09-18", imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg'
}]

export const communicationData: CommunicationDataProps[] = [{
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "Mamilioni", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}, {
    sender: "me", message: "Hey man? Good morning bro?", messageTime: "2022-09-18"
}]
export const sectionData: SectionDateInterface[] = [{
    title: "Content", data: ["Favourite Cars", "App Currency"]
}, {
    title: "Preferences", data: ["Language", "Notifications"]
}, {
    title: "App Features", data: ["Terms", "FAQ", "About App"]
}, {
    title: "User Settings", data: ["Change Password", "Change theme", "Update App", "Privacy", "Close Account", "Logout"]
}];

export const reviewArray: ReviewData[] = [{
    reviewer: "Sebastian",
    date: new Date().toDateString(),
    comment: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back,and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.",
    reviewSammury: "Very Good",
    rating: "9.1"
}, {
    reviewer: "Seba",
    date: new Date().toDateString(),
    comment: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back,and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.",
    reviewSammury: "Good service",
    rating: "8"
}, {
    reviewer: "User Tester",
    date: new Date().toDateString(),
    comment: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back,and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.",
    reviewSammury: "Longer delivery",
    rating: "2"
},

]
