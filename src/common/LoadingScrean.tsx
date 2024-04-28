import { Skeleton, Stack } from "@chakra-ui/react"

function LoadingScrean() {
    return (
        <Stack h={'100%'} w={'100%'} minW={{ base: '50vw', md: '80vw' }}>
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
            <Skeleton height="40px" startColor="gray.200" endColor="gray.400" />
        </Stack>
    )
}

export default LoadingScrean