import IResource = blueprint.core.IResource;
import IContainer = blueprint.core.IContainer;
import ILink = blueprint.core.ILink;
import Resource = blueprint.core.controls.Resource;
import Container = blueprint.core.controls.Container;
import Link = blueprint.core.controls.Link;
import Registry = blueprint.core.metadata.Registry;

export function load () {
    QUnit.module("controls/Container");

    function createTree (): IContainer {
        var children = [].en().toList();
        var root: IContainer = {id: 1, metadataUid: Registry.DEFAULT.uid, children: children};

        var child1 = {id: 2, metadataUid: Registry.DEFAULT.uid, links: [].en().toList()};
        var child2 = {id: 3, metadataUid: Registry.DEFAULT.uid, links: [].en().toList()};
        var link: ILink = {id: 1, peers: [child1, child2].en()};
        child1.links.push(link);
        child2.links.push(link);

        children.push(child1);
        children.push(child2);
        return root;
    }

    function createTemplate (): Fayde.Controls.ControlTemplate {
        var dxmlns = Fayde.XMLNS;
        var xxmlns = Fayde.XMLNSX;
        var bxmlns = blueprint.core.Library.uri.toString();

        return <Fayde.Controls.ControlTemplate>Fayde.Markup.Load(null,
            Fayde.Markup.CreateXaml(`<ControlTemplate xmlns="${dxmlns}" xmlns:x="${xxmlns}" xmlns:blueprint="${bxmlns}/controls" TargetType="blueprint:Container"><Canvas x:Name="Canvas"></Canvas></ControlTemplate>`));
    }

    QUnit.test("~init", (assert) => {
        var container = new Container();
        assert.ok(!container.Children);

        container.Source = createTree();
        assert.strictEqual(exjs.en(container.Children).count(), 2);
    });

    QUnit.test("~visuals", (assert) => {
        var container = new Container();
        container.Template = createTemplate();
        container.ApplyTemplate();

        var root = createTree();
        container.Source = root;

        var canvas = <Fayde.Controls.Canvas>container.GetTemplateChild("Canvas", Fayde.Controls.Canvas);
        var children = exjs.en(canvas.Children);
        assert.strictEqual(canvas.Children.Count, 3);
        assert.ok(children.any((res: Resource) => res.Source === root.children[0]));
        assert.ok(children.any((res: Resource) => res.Source === root.children[1]));
        assert.ok(children.any((link: Link) => link.Source === root.children[0].links[0]));
    });
}