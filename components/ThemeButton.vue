<template>
    <button
        @click="$emit('click', { theme, color_theme })"
        class="theme-button"
        :class="`theme-${theme} ${color_theme} ${selected ? 'selected' : ''}`"
    >
        {{ name }}
    </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
    @Prop({ required: true }) name!: string;
    @Prop({ required: true }) theme!: string;
    @Prop({ required: true }) color_theme!: string;
    @Prop({ required: true }) selected!: boolean;
}
</script>

<style lang="scss" scoped>
.theme-button {
    height: 100%;
    appearance: none;
    border: none;
    background: none;
    outline: none;
    position: relative;
    font-weight: 800;
    box-sizing: border-box;
    padding: 0.2em 1.5em;
    color: var(--primary);
    background: var(--background);

    &::after {
        transform-origin: right bottom;
        position: absolute;
        bottom: 0;
        left: 0;
        line-height: 1;
        height: 3px;
        width: 100%;
        background: var(--accent);
        content: '';
        transition: opacity 0.7s, transform 0.17s;
        transition-timing-function: ease-in;
        transform: scaleX(0);
    }

    &:hover::after,
    &:active::after {
        transform-origin: left bottom;
        transform: scaleX(1);
    }

    &.selected::after {
        transform: scaleX(1);
        top: 0;
    }
}
</style>
