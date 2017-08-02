/**
 * Helper method to generate a route object
 * @flow
 */
import { Component } from 'react';

export default function createRoute(
  path: string,
  screen: Component,
  title: string,
  description: string
) {
  return {
    path,
    title,
    screen,
    description,
  };
}
