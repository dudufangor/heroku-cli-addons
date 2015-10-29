'use strict';

let cli = require('heroku-cli-util');
let co  = require('co');

let run = cli.command(function (ctx, api) {
    return co(function* () {
        let addon    = yield api.get(`/addons/${ctx.args.addon}`);
        let addonUrl = `/apps/${addon.app.id}/addons/${addon.id}`;

        yield api.patch(addonUrl, {name: ctx.args.name});

        let oldName = ctx.args.addon;
        let newName = cli.color.magenta(ctx.args.name);

        cli.log(`${oldName} successfully renamed to ${newName}.`);
    });
});

let topic = 'addons';

module.exports = {
    topic:       topic,
    command:     'rename',
    wantsApp:    true,
    needsAuth:   true,
    preauth:     true,
    args:        [{name: 'addon'}, {name: 'name'}],
    run:         run,
    usage:       `${topic}:rename ADDON NEW_NAME`,
    description: 'Rename an add-on.'
};

