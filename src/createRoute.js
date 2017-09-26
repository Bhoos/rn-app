/**
 * Helper method to generate a route object
 * @flow
 */
import { Component } from 'react';
import { Route } from './types';

export default function createRoute(
  path: string,
  screen: Component,
  title: string,
  description: string
): Route {
  return {
    path,
    title,
    screen,
    description,
  };
}
