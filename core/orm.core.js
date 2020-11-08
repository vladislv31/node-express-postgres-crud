const db = require('./db.core')
const fs = require('fs')
const path = require('path')

async function init() {
    switch(process.argv[2]) {
        case 'init':
            initdb()
            break
        case 'seed':
            await seed(process.argv[3])
            break
    }
}

async function initdb() {
    await db.connect()
    try {
        const sql = fs.readFileSync(path.resolve(__dirname, '../common/sqls/initdb.pgsql'), 'utf8')

        const statements = sql.split(/;\s*$/m)
        for (let el of statements) {
            if (el.length > 3) {
                await db.query(el)
            }
        }
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        await db.end()
    }
}

async function seed(table) {
    await db.connect()

    try {
        let sql

        if (table === 'all') {
            sql = []
            const tables = ['users']

            for (let name of tables) {
                sql.push(fs.readFileSync(path.resolve(__dirname, `../common/sqls/seeds/${name}.pgsql`), 'utf8'))
            }

            sql = sql.join('')
        } else {
            sql = fs.readFileSync(path.resolve(__dirname, `../common/sqls/seeds/${table}.pgsql`), 'utf8')
        }

        const statements = sql.split(/;\s*$/m)
        for (let el of statements) {
            if (el.length > 3) {
                await db.query(el);
            }
        }
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        await db.end()
    }
}

init()