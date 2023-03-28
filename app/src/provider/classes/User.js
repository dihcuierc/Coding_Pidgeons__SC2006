class User {
    constructor(displayName, email, name, reviews, goals, displayImage, height, weight,age, gender) {
        this.displayName = displayName;
        this.email = email;
        this.name = name
        this.reviews = reviews;
        this.goals = goals;
        this.displayImage = displayImage;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.gender = gender;
    }
}

const userConverter = {
    toFirestore: (user) => {
        return {
            username:user.displayName,
            name: user.name,
            email: user.email,
            Reviews: user.reviews,
            goals: user.goals,
            image: user.displayImage,
            mobile: user.mobile,
            height: user.height,
            weight: user.weight,
            age: user.age,
            gender: user.gender,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.username, data.name,data.email,
            data.Reviews, data.goals, data.image,data.mobile,
            data.height,data.weight,data.age, data.gender)
    }
}

export {userConverter};