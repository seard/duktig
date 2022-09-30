<template>
  <header>
    <meta charset="utf-8" />
    <title>Så himla ägd Steph</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </header>

  <main>
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
  </main>
</template>

<script setup>
import LedController from '@/controllers/ledController.js';
</script>

<style scoped>
.emotion {
        transition: all 0.2s ease-in-out;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #66d0e1;
        color: white;
        width: 6rem;
        height: 6rem;
        border-radius: 2rem;
        user-select: none;
    }

    .emotion:hover {
        filter: brightness(120%) saturate(120%);
        transform: scale(1.05);
        background: #66d0e1;
    }

    .emotion:active {
        transform: scale(0.95);
        transition-duration: 0.1s
    }

    h1 {
        color: white;
    }

    body {
        background-color: #1ab2b8;
        background-image: linear-gradient(to right, #1ab2b8, #d282bd);
    }

    html {
        height: 100%;
    }

    body {
        margin: 0;
    }

    .bg {
        animation: slide 3s ease-in-out infinite alternate;
        background-image: linear-gradient(-60deg, #d282bd 50%, #1ab2b8 50%);
        bottom: 0;
        left: -50%;
        opacity: .5;
        position: fixed;
        right: -50%;
        top: 0;
        z-index: -1;
    }

    .bg2 {
        animation-direction: alternate-reverse;
        animation-duration: 8s;
    }

    .bg3 {
        animation-duration: 10s;
    }

    #emotion-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 2fr);
        gap: 1rem;
    }

    .content {
        left: 50%;
        padding: 10vmin;
        position: fixed;
        text-align: center;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    h1,
    p {
        font-family: monospace;
    }

    @keyframes slide {
        0% {
            transform: translateX(-25%);
        }

        100% {
            transform: translateX(25%);
        }
    }
</style>
