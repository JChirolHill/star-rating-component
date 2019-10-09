import React, { useState } from 'react';
import StarRating from './StarRating';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders 5 stars by default', () => {
  const { container } = render(
    <StarRating
      value={2}
      onClick={() => {}}
    />
  );

  expect(container.querySelectorAll('svg').length).toBe(5);
});

it('renders a specified number of stars', () => {
  const { container } = render(
    <StarRating
      value={2}
      onClick={() => {}}
      starCount={10}
    />
  );

  expect(container.querySelectorAll('svg').length).toBe(10);
});

it('renders empty stars with color #bbb by default', () => {
  const { getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={() => {}}
    />
  );

  const stars = getAllByTestId('star-is-filled-0');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveAttribute('color', '#bbb');
  }
});

it('renders empty stars with the color of the emptyColor value', () => {
  const { getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={() => {}}
      emptyColor="blue"
    />
  );

  const stars = getAllByTestId('star-is-filled-0');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveAttribute('color', 'blue');
  }
});

it('renders filled stars as yellow by default', () => {
  const { getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={() => {}}
    />
  );

  const stars = getAllByTestId('star-is-filled-1');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveAttribute('color', 'yellow');
  }
});

it('renders filled stars with the color of the filledColor value', () => {
  const { getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={() => {}}
      filledColor="blue"
    />
  );

  const stars = getAllByTestId('star-is-filled-1');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveAttribute('color', 'blue');
  }
});

it('renders a star using the 1x size by default', () => {
  const { container } = render(
    <StarRating
      value={2}
      onClick={() => {}}
    />
  );

  const stars = container.querySelectorAll('svg');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveClass('fa-1x');
  }
});

it('renders a star using the size value', () => {
  const { container } = render(
    <StarRating
      value={2}
      onClick={() => {}}
      size="5x"
    />
  );

  const stars = container.querySelectorAll('svg');
  for(var i=0; i<stars.length; i++) {
    expect(stars[i]).toHaveClass('fa-5x');
  }
});

it('renders 0 filled stars when value is 0', () => {
  const { getAllByTestId, queryByTestId } = render(
    <StarRating
      value={0}
      onClick={() => {}}
      filledColor="blue"
    />
  );

  expect(getAllByTestId('star-is-filled-0').length).toBe(5);
  expect(queryByTestId('star-is-filled-1')).toBeFalsy();
});

it('renders filled stars equal to value when value is greater than 0', () => {
  const { getAllByTestId } = render(
    <StarRating
      value={3}
      onClick={() => {}}
      filledColor="blue"
    />
  );

  expect(getAllByTestId('star-is-filled-0').length).toBe(2);
  expect(getAllByTestId('star-is-filled-1').length).toBe(3);
});

it('updates when clicking on an empty star', () => {
  const onClickHandler = jest.fn();

  const { queryByTestId, getByTestId, getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={onClickHandler}
    />
  );

  fireEvent.click(getByTestId('star-4'));

  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(4);
});

it('sets the value to 0 when clicking on a filled star', () => {
  const onClickHandler = jest.fn();

  const { queryByTestId, getByTestId, getAllByTestId } = render(
    <StarRating
      value={2}
      onClick={onClickHandler}
    />
  );

  fireEvent.click(getByTestId('star-2'));

  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(0);
});
