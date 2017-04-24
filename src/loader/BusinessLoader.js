// @flow

import DataLoader from 'dataloader';
import ConnectionFromMongoCursor from '../connection/ConnectionFromMongoCursor';
import BusinessModel from '../model/Business';

type BusinessType = {
  id: string,
  _id: string,
  name: string,
  likesCount: number,
  url: string,
  active: boolean,
  createdAt: string,
  updatedAt: string,
}

export default class Business {
  id: string;
  _id: string;
  name: string;
  likesCount: number;
  url: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;

  static BusinessLoader = new DataLoader(
    ids => Promise.all(
      ids.map(id =>
        BusinessModel.findOne({ _id: id })
      ),
    ),
  );

  constructor(data: BusinessType) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.likesCount = data.likesCount;
    this.url = data.url;
    this.active = data.active;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static viewerCanSee(viewer, data) {
    // TODO: handle security

    return true;
  }

  static async load(viewer, id) {
    if (!id) {
      return null;
    }

    const data = await Business.BusinessLoader.load(id.toString());

    return Business.viewerCanSee(viewer, data) ? new Business(data) : null;
  }

  static clearCache(id) {
    return Business.BusinessLoader.clear(id.toString());
  }

  static async loadBusinesses(viewer, args) {
    // TODO: specify conditions
    const businesses = BusinessModel.find({});

    return ConnectionFromMongoCursor.connectionFromMongoCursor(
      viewer, businesses, args, Business.load,
    );
  }
}
