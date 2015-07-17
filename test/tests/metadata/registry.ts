import registry = blueprint.core.metadata.registry;

export function load () {
    QUnit.module('metadata/registry');

    QUnit.test("default", (assert) => {
        var dmeta = registry.get();
        assert.ok(!!dmeta);
    });

    QUnit.test("get", (assert) => {
        registry.add({
            uid: {},
            bundle: "custom",
            group: "group1",
            name: "custom-resource"
        });
        registry.add({
            uid: {},
            bundle: "custom",
            group: "group2",
            name: "another-resource"
        });

        assert.ok(!registry.get("non-existent").any());
        assert.strictEqual(registry.get("custom").count(m => m.name === "custom-resource"), 1);
        assert.strictEqual(registry.get("custom").count(), 2);
        assert.ok(!registry.get("custom", "no-group").any());
        assert.strictEqual(registry.get("custom", "group1").count(), 1);
    });
}