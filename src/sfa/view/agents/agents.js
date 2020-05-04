import { PLATFORM } from 'aurelia-pal';

export class Agents {
  configureRouter(config, router) {
    config.title = 'Agents';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: '', redirect: 'listview' },
      { route: 'listview', moduleId: PLATFORM.moduleName('sfa/components/agent/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('sfa/components/agent/cardview/cardview'), name: 'cardview' },

    ]);
    this.router = router;
  }
}

