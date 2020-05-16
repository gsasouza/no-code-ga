import * as React from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';

// Call it once in your app. At the root of your app is the best place
toast.configure();

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e5e5e5;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 { 
    color: rgba(0,0,0,.85);
    margin: 0;
    font-weight: 500;
  }
  .__react_component_tooltip {
    max-width: 10rem;
  }
  .tooltip {
    z-index: 99999;
  }
  .ant-select-item {
    font-size: 14px !important;
    min-height: 0 !important;
  }
  .fade-enter,
.fade-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.fade-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.fade-enter.fade-enter-active,
.fade-appear.fade-appear-active {
  -webkit-animation-name: antFadeIn;
          animation-name: antFadeIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.fade-leave.fade-leave-active {
  -webkit-animation-name: antFadeOut;
          animation-name: antFadeOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.fade-enter,
.fade-appear {
  opacity: 0;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
}
.fade-leave {
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
}
@-webkit-keyframes antFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes antFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes antFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes antFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.move-up-enter,
.move-up-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-up-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-up-enter.move-up-enter-active,
.move-up-appear.move-up-appear-active {
  -webkit-animation-name: antMoveUpIn;
          animation-name: antMoveUpIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.move-up-leave.move-up-leave-active {
  -webkit-animation-name: antMoveUpOut;
          animation-name: antMoveUpOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.move-up-enter,
.move-up-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.move-up-leave {
  -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
          animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
}
.move-down-enter,
.move-down-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-down-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-down-enter.move-down-enter-active,
.move-down-appear.move-down-appear-active {
  -webkit-animation-name: antMoveDownIn;
          animation-name: antMoveDownIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.move-down-leave.move-down-leave-active {
  -webkit-animation-name: antMoveDownOut;
          animation-name: antMoveDownOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.move-down-enter,
.move-down-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.move-down-leave {
  -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
          animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
}
.move-left-enter,
.move-left-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-left-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-left-enter.move-left-enter-active,
.move-left-appear.move-left-appear-active {
  -webkit-animation-name: antMoveLeftIn;
          animation-name: antMoveLeftIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.move-left-leave.move-left-leave-active {
  -webkit-animation-name: antMoveLeftOut;
          animation-name: antMoveLeftOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.move-left-enter,
.move-left-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.move-left-leave {
  -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
          animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
}
.move-right-enter,
.move-right-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-right-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.move-right-enter.move-right-enter-active,
.move-right-appear.move-right-appear-active {
  -webkit-animation-name: antMoveRightIn;
          animation-name: antMoveRightIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.move-right-leave.move-right-leave-active {
  -webkit-animation-name: antMoveRightOut;
          animation-name: antMoveRightOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.move-right-enter,
.move-right-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.move-right-leave {
  -webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
          animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
}
@-webkit-keyframes antMoveDownIn {
  0% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@keyframes antMoveDownIn {
  0% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@-webkit-keyframes antMoveDownOut {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@keyframes antMoveDownOut {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(100%);
            transform: translateY(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@-webkit-keyframes antMoveLeftIn {
  0% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@keyframes antMoveLeftIn {
  0% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@-webkit-keyframes antMoveLeftOut {
  0% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@keyframes antMoveLeftOut {
  0% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@-webkit-keyframes antMoveRightIn {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@keyframes antMoveRightIn {
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@-webkit-keyframes antMoveRightOut {
  0% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@keyframes antMoveRightOut {
  0% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@-webkit-keyframes antMoveUpIn {
  0% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@keyframes antMoveUpIn {
  0% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
}
@-webkit-keyframes antMoveUpOut {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@keyframes antMoveUpOut {
  0% {
    -webkit-transform: translateY(0%);
            transform: translateY(0%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
    opacity: 0;
  }
}
@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
[ant-click-animating='true'],
[ant-click-animating-without-extra-node='true'] {
  position: relative;
}
html {
  --antd-wave-shadow-color: #1890ff;
  --scroll-bar: 0;
}
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  border-radius: inherit;
  -webkit-box-shadow: 0 0 0 0 #1890ff;
          box-shadow: 0 0 0 0 #1890ff;
  -webkit-box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
          box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
  opacity: 0.2;
  -webkit-animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1), waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
          animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1), waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  content: '';
  pointer-events: none;
}
@-webkit-keyframes waveEffect {
  100% {
    -webkit-box-shadow: 0 0 0 #1890ff;
            box-shadow: 0 0 0 #1890ff;
    -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
            box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
  }
}
@keyframes waveEffect {
  100% {
    -webkit-box-shadow: 0 0 0 #1890ff;
            box-shadow: 0 0 0 #1890ff;
    -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
            box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
  }
}
@-webkit-keyframes fadeEffect {
  100% {
    opacity: 0;
  }
}
@keyframes fadeEffect {
  100% {
    opacity: 0;
  }
}
.slide-up-enter,
.slide-up-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-up-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-up-enter.slide-up-enter-active,
.slide-up-appear.slide-up-appear-active {
  -webkit-animation-name: antSlideUpIn;
          animation-name: antSlideUpIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.slide-up-leave.slide-up-leave-active {
  -webkit-animation-name: antSlideUpOut;
          animation-name: antSlideUpOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.slide-up-enter,
.slide-up-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-up-leave {
  -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.slide-down-enter,
.slide-down-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-down-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-down-enter.slide-down-enter-active,
.slide-down-appear.slide-down-appear-active {
  -webkit-animation-name: antSlideDownIn;
          animation-name: antSlideDownIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.slide-down-leave.slide-down-leave-active {
  -webkit-animation-name: antSlideDownOut;
          animation-name: antSlideDownOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.slide-down-enter,
.slide-down-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-down-leave {
  -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.slide-left-enter,
.slide-left-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-left-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-left-enter.slide-left-enter-active,
.slide-left-appear.slide-left-appear-active {
  -webkit-animation-name: antSlideLeftIn;
          animation-name: antSlideLeftIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.slide-left-leave.slide-left-leave-active {
  -webkit-animation-name: antSlideLeftOut;
          animation-name: antSlideLeftOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.slide-left-enter,
.slide-left-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-left-leave {
  -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
.slide-right-enter,
.slide-right-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-right-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.slide-right-enter.slide-right-enter-active,
.slide-right-appear.slide-right-appear-active {
  -webkit-animation-name: antSlideRightIn;
          animation-name: antSlideRightIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.slide-right-leave.slide-right-leave-active {
  -webkit-animation-name: antSlideRightOut;
          animation-name: antSlideRightOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.slide-right-enter,
.slide-right-appear {
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
          animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-right-leave {
  -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
          animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
}
@-webkit-keyframes antSlideUpIn {
  0% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}
@keyframes antSlideUpIn {
  0% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}
@-webkit-keyframes antSlideUpOut {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
}
@keyframes antSlideUpOut {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
}
@-webkit-keyframes antSlideDownIn {
  0% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }
}
@keyframes antSlideDownIn {
  0% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }
}
@-webkit-keyframes antSlideDownOut {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 0;
  }
}
@keyframes antSlideDownOut {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0.8);
            transform: scaleY(0.8);
    -webkit-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
    opacity: 0;
  }
}
@-webkit-keyframes antSlideLeftIn {
  0% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}
@keyframes antSlideLeftIn {
  0% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
}
@-webkit-keyframes antSlideLeftOut {
  0% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
}
@keyframes antSlideLeftOut {
  0% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
    opacity: 0;
  }
}
@-webkit-keyframes antSlideRightIn {
  0% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
}
@keyframes antSlideRightIn {
  0% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
}
@-webkit-keyframes antSlideRightOut {
  0% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 0;
  }
}
@keyframes antSlideRightOut {
  0% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(0.8);
            transform: scaleX(0.8);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
    opacity: 0;
  }
}
.zoom-enter,
.zoom-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-enter.zoom-enter-active,
.zoom-appear.zoom-appear-active {
  -webkit-animation-name: antZoomIn;
          animation-name: antZoomIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-leave.zoom-leave-active {
  -webkit-animation-name: antZoomOut;
          animation-name: antZoomOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-enter,
.zoom-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-big-enter,
.zoom-big-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-big-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-big-enter.zoom-big-enter-active,
.zoom-big-appear.zoom-big-appear-active {
  -webkit-animation-name: antZoomBigIn;
          animation-name: antZoomBigIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-big-leave.zoom-big-leave-active {
  -webkit-animation-name: antZoomBigOut;
          animation-name: antZoomBigOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-big-enter,
.zoom-big-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-big-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-big-fast-enter,
.zoom-big-fast-appear {
  -webkit-animation-duration: 0.1s;
          animation-duration: 0.1s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-big-fast-leave {
  -webkit-animation-duration: 0.1s;
          animation-duration: 0.1s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-big-fast-enter.zoom-big-fast-enter-active,
.zoom-big-fast-appear.zoom-big-fast-appear-active {
  -webkit-animation-name: antZoomBigIn;
          animation-name: antZoomBigIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-big-fast-leave.zoom-big-fast-leave-active {
  -webkit-animation-name: antZoomBigOut;
          animation-name: antZoomBigOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-big-fast-enter,
.zoom-big-fast-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-big-fast-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-up-enter,
.zoom-up-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-up-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-up-enter.zoom-up-enter-active,
.zoom-up-appear.zoom-up-appear-active {
  -webkit-animation-name: antZoomUpIn;
          animation-name: antZoomUpIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-up-leave.zoom-up-leave-active {
  -webkit-animation-name: antZoomUpOut;
          animation-name: antZoomUpOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-up-enter,
.zoom-up-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-up-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-down-enter,
.zoom-down-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-down-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-down-enter.zoom-down-enter-active,
.zoom-down-appear.zoom-down-appear-active {
  -webkit-animation-name: antZoomDownIn;
          animation-name: antZoomDownIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-down-leave.zoom-down-leave-active {
  -webkit-animation-name: antZoomDownOut;
          animation-name: antZoomDownOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-down-enter,
.zoom-down-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-down-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-left-enter,
.zoom-left-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-left-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-left-enter.zoom-left-enter-active,
.zoom-left-appear.zoom-left-appear-active {
  -webkit-animation-name: antZoomLeftIn;
          animation-name: antZoomLeftIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-left-leave.zoom-left-leave-active {
  -webkit-animation-name: antZoomLeftOut;
          animation-name: antZoomLeftOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-left-enter,
.zoom-left-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-left-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
.zoom-right-enter,
.zoom-right-appear {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-right-leave {
  -webkit-animation-duration: 0.2s;
          animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
}
.zoom-right-enter.zoom-right-enter-active,
.zoom-right-appear.zoom-right-appear-active {
  -webkit-animation-name: antZoomRightIn;
          animation-name: antZoomRightIn;
  -webkit-animation-play-state: running;
          animation-play-state: running;
}
.zoom-right-leave.zoom-right-leave-active {
  -webkit-animation-name: antZoomRightOut;
          animation-name: antZoomRightOut;
  -webkit-animation-play-state: running;
          animation-play-state: running;
  pointer-events: none;
}
.zoom-right-enter,
.zoom-right-appear {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
  -webkit-animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
          animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
}
.zoom-right-leave {
  -webkit-animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
          animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
}
@-webkit-keyframes antZoomIn {
  0% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes antZoomIn {
  0% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes antZoomOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0;
  }
}
@keyframes antZoomOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.2);
            transform: scale(0.2);
    opacity: 0;
  }
}
@-webkit-keyframes antZoomBigIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes antZoomBigIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes antZoomBigOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0;
  }
}
@keyframes antZoomBigOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    opacity: 0;
  }
}
@-webkit-keyframes antZoomUpIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
}
@keyframes antZoomUpIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
}
@-webkit-keyframes antZoomUpOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 0;
  }
}
@keyframes antZoomUpOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
    opacity: 0;
  }
}
@-webkit-keyframes antZoomLeftIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
  }
}
@keyframes antZoomLeftIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
  }
}
@-webkit-keyframes antZoomLeftOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 0;
  }
}
@keyframes antZoomLeftOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    opacity: 0;
  }
}
@-webkit-keyframes antZoomRightIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
  }
}
@keyframes antZoomRightIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
  }
}
@-webkit-keyframes antZoomRightOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    opacity: 0;
  }
}
@keyframes antZoomRightOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    opacity: 0;
  }
}
@-webkit-keyframes antZoomDownIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
}
@keyframes antZoomDownIn {
  0% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
}
@-webkit-keyframes antZoomDownOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
}
@keyframes antZoomDownOut {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
  100% {
    -webkit-transform: scale(0.8);
            transform: scale(0.8);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
}
.ant-motion-collapse-legacy {
  overflow: hidden;
}
.ant-motion-collapse-legacy-active {
  -webkit-transition: height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  transition: height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}
.ant-motion-collapse {
  overflow: hidden;
  -webkit-transition: height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
  transition: height 0.15s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}
a {
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #40a9ff;
  }
}
`;

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactTooltip effect="solid" className="notranslate tooltip" />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
