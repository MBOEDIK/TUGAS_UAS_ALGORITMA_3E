const nodes = [
    { x: 100, y: 80 }, { x: 300, y: 50 }, { x: 500, y: 80 },
    { x: 80, y: 175 }, { x: 300, y: 175 }, { x: 520, y: 175 },
    { x: 100, y: 270 }, { x: 300, y: 300 }, { x: 500, y: 270 },
    { x: 400, y: 220 }
];

const edges = [
    [0,1,4], [0,3,2], [1,2,3], [1,4,5], [2,5,2], 
    [3,6,6], [3,4,7], [4,7,1], [4,9,3], [5,8,4], 
    [6,7,2], [7,8,5], [8,9,2], [2,9,8]
];

const adjMatrix = Array(10).fill(null).map(() => Array(10).fill(0));
edges.forEach(([u, v, w]) => { adjMatrix[u][v] = w; adjMatrix[v][u] = w; });

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    edges.forEach(([u, v, w]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[u].x, nodes[u].y);
        ctx.lineTo(nodes[v].x, nodes[v].y);
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#9932CC';
        ctx.font = '12px Arial';
        ctx.fillText(w, (nodes[u].x + nodes[v].x)/2, (nodes[u].y + nodes[v].y)/2);
    });

    nodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#9932CC';
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(i, node.x, node.y + 5);
    });
}

function calculateDijkstra() {
    const startNode = parseInt(document.getElementById('startNode').value);
    const distances = Array(10).fill(Infinity);
    const visited = Array(10).fill(false);
    distances[startNode] = 0;

    for (let i = 0; i < 10; i++) {
        let u = -1;
        for (let j = 0; j < 10; j++) {
            if (!visited[j] && (u === -1 || distances[j] < distances[u])) u = j;
        }

        if (distances[u] === Infinity) break;
        visited[u] = true;

        for (let v = 0; v < 10; v++) {
            if (adjMatrix[u][v] !== 0) {
                let alt = distances[u] + adjMatrix[u][v];
                if (alt < distances[v]) distances[v] = alt;
            }
        }
    }
    displayResults(distances);
}

function displayResults(dist) {
    const grid = document.getElementById('distanceGrid');
    grid.innerHTML = '';
    dist.forEach((d, i) => {
        const item = document.createElement('div');
        item.className = 'distance-item';
        item.innerHTML = `
            <span class="dist-label">Ke Titik ${i}</span>
            <span class="dist-val">${d === Infinity ? '∞' : d}</span>
        `;
        grid.appendChild(item);
    });
}

drawGraph();