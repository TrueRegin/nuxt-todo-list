<template>
    <div id="app" :class="getTheme">
        <div id="nav">
            <theme-button v-for="({theme, color_theme, name}, i) in getThemes" :key="i" @click="selectTheme" :theme="theme"
            :color_theme="color_theme" :name="name" />
        </div>
        <main id="content">
            <Nuxt />
        </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Getter } from 'nuxt-property-decorator';
import ThemeButton from '~/components/ThemeButton.vue';
import { ColorType, Theme, ThemeType } from '~/types/Theme';

@Component({
    components: { ThemeButton },
})
export default class DefaultLayout extends Vue {
    theme: ThemeType = 'sanguine';
    color: ColorType = 'light';
    @Getter('themes/getThemes') getThemes!: Theme[];

    selectTheme(theme: Theme) {
        this.theme = theme.theme;
        this.color = theme.color_theme;
    }

    get getTheme() {
        return { [this.color]: true, [`theme-${this.theme}`]: true };
    }
}
</script>

<style lang="scss">
html,
body,
#__layout,
#__nuxt,
#app {
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
}

#app {
    color: var(--color);
    background: var(--background);

    display: grid;
    grid-template-rows: 50px 1fr;

    #nav {
        background: var(--gray-1);
    }
}

html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

body {
    margin: 0;
}
</style>
