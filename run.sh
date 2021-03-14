docker run --name postgres \
	-e POSTGRES_PASSWORD=docker -p 5432:54 \
	32 -d postgres \

docker run --name mogodb -p 27017:27017 -d -t mongo

docker run --name redis -p 6379:6379 -d -t redis:alpine
