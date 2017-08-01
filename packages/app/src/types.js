// @flow
import { Component, Element } from 'react';

export type Route = {
  path: string,
  scene: Component,
  title?: string,
  description?: string,
  fullsize?: boolean,
};

export type RouteId = {
  path: string,
  params: object,
};

export type RouteChangeListener = (prevRoute: RouteId, nextRoute: RouteId) => void;
export type RouteListenerUnsubscribe = () => void;

export type Scene = { };

export interface Container {
  setScenes(scenes: Array<Element>): void;
}

export interface Router {
  getRoute(path: string): Route,
  getCurrentRoute(): RouteId;

  show(path, params): RouteId;
  back(): void;

  addRouteChangeListener(listener: RouteChangeListener): RouteListenerUnsubscribe;

  attach(container: Container): void;
  detach(container: Container): void;
}
