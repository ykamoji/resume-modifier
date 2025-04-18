import Container from "react-bootstrap/Container";
import Button from "../../UI/Button/Button.tsx";
import Row from "react-bootstrap/Row";

const Home = () => {

    const links = [
        {
            name:"Portfolio",
            url: "https://ykamoji.github.io/"
        },
        {
            name:"Github",
            url:"https://github.com/ykamoji"
        }

    ]

    return (
        <>
            <Container className={"text-center mt-5"}>
                {
                    links.map(({name, url}, index) =>
                        <Row key={index} className={"mb-3 justify-content-center"}>
                            <Button type={"button"} variant={"outline-primary"} className={"rounded-0 w-25"}
                                    onClick={() => window.open(url, '_blank')}>
                                {name}
                            </Button>
                        </Row>
                    )}
            </Container>
        </>
    )
}

export default Home