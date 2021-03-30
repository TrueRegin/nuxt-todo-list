import { Module, VuexModule } from 'vuex-module-decorators';
import { Theme } from '~/types/Theme';

@Module({ namespaced: true, name: 'themes', stateFactory: true,  })
export default class extends VuexModule {
    themes: Theme[] = [
        {
            name: 'Azure Dark',
            theme: 'azure',
            color_theme: 'dark',
        },
        {
            name: 'Draconic Dark',
            theme: 'draconic',
            color_theme: 'dark',
        },
        {
            name: 'Sanguine Light',
            theme: 'sanguine',
            color_theme: 'light',
        },
    ];

    get getThemes() {
        return [...this.themes];
    }
}
