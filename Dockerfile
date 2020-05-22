FROM keymetrics/pm2:latest-jessie

RUN apt-get update

# Bundle APP files
# RUN mkdir /node
# COPY . /node

EXPOSE 3000

# Environment variables
# Add/change/overwrite with docker run --env key=value
# ENV NPM_CONFIG_LOGLEVEL warn

# From now one we are working in /node
# WORKDIR /node
# RUN cp entrypoint.sh /usr/local/bin/ && \
#     chmod +x /usr/local/bin/entrypoint.sh

#RUN npm
#RUN yarn
USER ec2-user
ENV PATH /home/ec2-user/.local/bin:/home/circleci/bin:${PATH}


ENTRYPOINT ["npm", "run", "start"]
#CMD ["pm2-runtime", "start", "./pm2/production.json"]
#ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]