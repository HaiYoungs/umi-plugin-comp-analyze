const Koa = require('koa');
const path = require('path');
const staticFiles = require('koa-static');

interface IServer {
    port: number;
    host: string;
    openBrowser: boolean;
    html: string;
}

/**
 * 本地服务
 */
class Server {
    opts: { port: number; host: string; openBrowser: boolean; html: string };
    app: any;

    constructor (opts: IServer) {
        const {
            port = 8889,
            host = '127.0.0.1',
            openBrowser = true,
            html = ''
        } = opts || {}
        this.opts = { port, host, openBrowser, html };
        this.app = new Koa();
    }

    start () {
        this.app.use(staticFiles(path.join(__dirname, '../public/')))
        
        this.app.use((ctx: any) => {
            if (ctx.request.method === 'GET' && ctx.request.path === '/') {
                ctx.set('Content-Type', 'text/html');
                ctx.body = this.opts.html
            }
        });
        this.app.listen(this.opts.port, () => {
            console.log(`项目运行在${this.opts.port}端口下`)
        })
    }
}

module.exports = Server;

export {}