import { useState, useCallback } from 'react';

export const useApi = (asyncFunc) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [err, setErr] = useState(null);

    const execute = useCallback((...args) => {
        setLoading(true);
        asyncFunc(...args).then(res => {
            setResult(res);
            setErr(null);
        }).catch((err) => {
            setResult(null);
            setErr(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [asyncFunc]);

    return [{ loading, result, err }, execute];
}