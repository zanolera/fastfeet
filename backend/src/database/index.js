import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliveryman, Delivery, DeliveryProblem, File];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    mongo() {
        this.connection = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        });
    }
}

export default new Database();
