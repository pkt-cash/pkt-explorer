import React from 'react'
import Loader from './Loader'

export default {
  title: 'Loader',
  component: Loader
}

export const LoaderNoTextSt = () => <Loader />
export const LoaderTextSt = () => <Loader text='Loading something'/>
export const LoaderSmallSt = () => <Loader text='Loading something' small/>

LoaderNoTextSt.story = {
  name: 'Loader no text'
}

LoaderTextSt.story = {
  name: 'Loader with text'
}
LoaderSmallSt.story = {
  name: 'Small Loader with text '
}
