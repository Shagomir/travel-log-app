// DEPRECATED

// import React, { useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import { QUERY_SINGLE_LOCATION } from "../utils/queries";
// import {
//   Box,
//   Button,
//   Card,
//   CardBody,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
// } from "@chakra-ui/react";
// import EditForm from "../components/EditForm";

// const Edit = () => {
//   const { id } = useParams();
//   const { loading, error, data } = useQuery(QUERY_SINGLE_LOCATION, {
//     variables: { locationId: id },
//   });
//   const location = data?.location || {};
//   // console.log(location);

//   return (
//     <>
//       <EditForm location={location} />{" "}
//     </>
//   );
// };

// export default Edit;
