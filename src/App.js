import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import moment from "moment";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    paginate: {
        "& ul": {
            justifyContent: "flex-end",
        },
        "& .MuiPaginationItem-root": {
            borderRadius: "8px !important",
            color: "#000 !important",
        },
        "& .Mui-selected": {
            backgroundColor: "#000",
        },
    },
}));
function App() {
    const classes = useStyles();
    const [datas, setDatas] = useState({
        hits: [],
        all: [],
    });

    const [page, setPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setDatas((prevState) => ({
                        ...prevState,
                        hits: [...datas.hits, ...data.hits],
                        all: [data],
                    }));
                    setPage((prevState) => prevState + 1);
                });
        }, 10000);

        return () => clearInterval(interval);
    }, [datas.hits, page]);

    console.log(datas, page);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <Box>
                <TableContainer>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">URL</TableCell>
                                <TableCell align="center">Created_at</TableCell>
                                <TableCell align="center">Author</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {data?.map((item, i) => */}
                            {datas?.hits.map((hit, j) => (
                                <TableRow key={j}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {hit.title}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {hit.url}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {moment(hit.created_at).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {hit.author}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={3}>
                <Pagination
                    className={classes.paginate}
                    count={datas?.all?.map((item) => item.page)}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
        </>
    );
}

export default App;
