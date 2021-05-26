let ENV = '';
try {
    console.log('window', !!window)
} catch (error) {
    const port = process.env.PORT || 8090
    ENV = `http://127.0.0.1:${port}`;
    console.log('node server api start')
}

export default {
    ENV
}