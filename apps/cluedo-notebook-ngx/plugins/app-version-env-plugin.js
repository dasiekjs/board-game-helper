
const appVersionEnvPlugin = {
  name: 'app-version-env-plugin',
  setup(build) {
    const options = build.initialOptions;

    options.define['process.env.APP_VERSION'] = JSON.stringify(process.env.APP_VERSION ?? 'development');
  },
};

module.exports = appVersionEnvPlugin;
