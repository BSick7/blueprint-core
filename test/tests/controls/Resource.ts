import IResource = blueprint.core.IResource;
import IContainer = blueprint.core.IContainer;
import ILink = blueprint.core.ILink;
import Resource = blueprint.core.controls.Resource;
import BitmapImage = Fayde.Media.Imaging.BitmapImage;
import Registry = blueprint.core.metadata.Registry;

export function load () {
    QUnit.module('controls/Resource');

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

    QUnit.test("~init", (assert) => {
        var res = new Resource();
        assert.ok(!res.Links);
        assert.ok(!res.ImageSource);

        res.Source = createTree().children[0];
        assert.strictEqual(exjs.en(res.Links).count(), 1);
        var bi = <BitmapImage>res.ImageSource;
        assert.ok(bi instanceof BitmapImage);
        assert.ok(!!bi.UriSource);
        assert.strictEqual(bi.UriSource.toString(), Registry.DEFAULT.thumbnail);
    });
}