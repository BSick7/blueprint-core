module runner {
    var libpath = "lib/blueprint-core/dist/blueprint-core";
    var testModules = [
        ".build/tests/metadata/Registry",
        ".build/tests/controls/Resource",
        ".build/tests/controls/Container"
    ];

    Fayde.LoadConfigJson((config, err) => {
        if (err)
            console.warn("Error loading configuration file.", err);

        require([libpath], () => {
            require(testModules, (...modules: any[]) => {
                for (var i = 0; i < modules.length; i++) {
                    modules[i].load();
                }
                QUnit.load();
                QUnit.start();
            });
        });
    });
}