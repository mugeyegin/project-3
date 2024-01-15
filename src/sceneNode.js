/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        var nodeMatrix = this.trs.getTransformationMatrix();

        var transformedMvp = MatrixMult(mvp, nodeMatrix);
        var transformedModelView = MatrixMult(modelView, nodeMatrix);
        var transformedNormals = MatrixMult(normalMatrix, nodeMatrix);
        var transformedModel = MatrixMult(modelMatrix, nodeMatrix);

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel );
        }
    }
    updateCoords(transX, transY, transZ){
		console.log(this.globalCoords, transX,transY,transZ);
		this.globalCoords.x += transX;
		this.globalCoords.y += transY;
		this.globalCoords.z += transZ;
		// console.log(this.globalCoords, transX,transY,transZ);
		for (var i = 0; i < this.children.length; i++) {
            this.children[i].updateCoords(this.globalCoords.x, 
			this.globalCoords.y, this.globalCoords.z);
        }
	}
    

    

}