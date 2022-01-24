function LoadingPersonsData(Component) {
    return function LoadingPersonsData({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />

        else return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }
}

export default LoadingPersonsData